import { setupAuth } from './setups/setupAuth';
import { setupHttp } from './setups/setupHttp';
import { setupRxDb } from './setups/setupRxDb';

setupRxDb();
setupHttp();
setupAuth();
