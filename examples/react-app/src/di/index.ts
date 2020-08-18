import di from '@jsmodules/di';
import { RxDbKeyValueStorage } from '@jsmodules/storage';

di.Register("kvStorage", "Request").class(RxDbKeyValueStorage);
