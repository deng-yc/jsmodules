import { nextId as _nextId, guid as _guid } from './id';
import { wait as _wait } from './wait';

export const nextId = _nextId;
export const guid = _guid;
export const wait = _wait;

export default {
    nextId,
    guid,
    wait
}