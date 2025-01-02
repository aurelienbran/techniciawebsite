import { MaintenanceProcedure } from '../../types/maintenance';
import { searchMaintenanceDocs } from './search';
import { AppError } from '../../utils/errorUtils';

export async function processMaintenanceQuery(query: string): Promise<MaintenanceProcedure[]> {
  try {
    // Extract maintenance context from query
    const category = extractMaintenanceCategory(query);
    const equipmentType = extractEquipmentType(query);
    const urgency = extractUrgency(query);

    // Search with extracted parameters
    const results = await searchMaintenanceDocs({
      query,
      category,
      equipmentType,
      urgency,
    });

    return results.map(formatMaintenanceProcedure);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to process maintenance query', 'QUERY_PROCESSING_ERROR', 500);
  }
}

function extractMaintenanceCategory(query: string) {
  const categories = {
    preventive: ['preventive', 'scheduled', 'routine'],
    corrective: ['repair', 'fix', 'broken'],
    predictive: ['monitor', 'predict', 'trending'],
    emergency: ['emergency', 'urgent', 'immediate'],
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => query.toLowerCase().includes(keyword))) {
      return category as MaintenanceProcedure['category'];
    }
  }

  return undefined;
}

function extractEquipmentType(query: string) {
  const types = {
    mechanical: ['mechanical', 'gear', 'belt', 'pump'],
    electrical: ['electrical', 'circuit', 'wiring'],
    hydraulic: ['hydraulic', 'fluid', 'pressure'],
    pneumatic: ['pneumatic', 'air', 'compression'],
    hvac: ['hvac', 'cooling', 'heating', 'ventilation'],
  };

  for (const [type, keywords] of Object.entries(types)) {
    if (keywords.some(keyword => query.toLowerCase().includes(keyword))) {
      return type as MaintenanceProcedure['equipmentType'];
    }
  }

  return undefined;
}

function extractUrgency(query: string) {
  const urgencyLevels = {
    high: ['emergency', 'urgent', 'critical'],
    medium: ['soon', 'moderate', 'needed'],
    low: ['routine', 'scheduled', 'planned'],
  };

  for (const [level, keywords] of Object.entries(urgencyLevels)) {
    if (keywords.some(keyword => query.toLowerCase().includes(keyword))) {
      return level as 'low' | 'medium' | 'high';
    }
  }

  return undefined;
}

function formatMaintenanceProcedure(result: any): MaintenanceProcedure {
  return {
    id: result.id,
    title: result.title,
    category: result.category,
    equipmentType: result.equipmentType,
    steps: result.steps || [],
    safety: result.safety || [],
    tools: result.tools || [],
    estimatedTime: result.estimatedTime || 0,
  };
}