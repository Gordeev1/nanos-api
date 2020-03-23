import { Stat } from 'src/common/models/stat';

export type IStatsSummary = Pick<Stat, 'impressions' | 'cost_per_click' | 'clicks'>;
