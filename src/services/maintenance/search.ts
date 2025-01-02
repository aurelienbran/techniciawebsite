import { MaintenanceSearchParams } from '../../types/maintenance';
import { searchVectors } from '../vectorDb/client';
import { AppError } from '../../utils/errorUtils';

export async function searchMaintenanceDocs(params: MaintenanceSearchParams) {
  try {
    const filters = {
      ...(params.category && { category: params.category }),
      ...(params.equipmentType && { equipmentType: params.equipmentType }),
      ...(params.urgency && { urgency: params.urgency }),
    };

    const results = await searchVectors({
      query: params.query,
      filters,
      limit: 5,
      threshold: 0.7,
    });

    return results.matches.map(match => ({
      ...match.metadata,
      similarity: match.score,
    }));
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Maintenance search failed', 'MAINTENANCE_SEARCH_ERROR', 500);
  }
}