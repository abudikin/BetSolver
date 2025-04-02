export class UpdateDisputeDto {
    title?: string;
    description?: string;
    stake?: string;
    status?: 'pending' | 'active' | 'completed';
    deadline?: Date;
  }