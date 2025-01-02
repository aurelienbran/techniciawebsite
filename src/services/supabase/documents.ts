import { supabase } from '../../lib/supabase/client';
import type { Database } from '../../lib/supabase/types';

type Document = Database['public']['Tables']['documents']['Row'];

export async function uploadDocument(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `documents/${fileName}`;

  // Upload file to storage
  const { error: uploadError } = await supabase.storage
    .from('documents')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // Create document record
  const { data: document, error: dbError } = await supabase
    .from('documents')
    .insert({
      title: file.name,
      content: filePath,
      type: getDocumentType(file.type),
      metadata: {
        size: file.size,
        mimeType: file.type,
      },
      created_by: (await supabase.auth.getUser()).data.user?.id,
    })
    .select()
    .single();

  if (dbError) throw dbError;
  return document;
}

export async function getDocuments() {
  const { data: documents, error } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return documents;
}

export async function deleteDocument(id: string) {
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

function getDocumentType(mimeType: string): Database['public']['Tables']['documents']['Row']['type'] {
  if (mimeType.includes('pdf')) return 'pdf';
  if (mimeType.includes('image')) return 'image';
  return 'text';
}