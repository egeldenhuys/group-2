import { SensorResponse } from './sensor-response.model';
import { Observable } from 'rxjs';

/**
 * Sensor config
 */
export interface Sensor {
    ID: number;
    IP: string;
    Port: number;
    City: string;
    postfix?: string;
    Poller?: any; // observable
    LastTrigger?: number;
    socket?: any;
}
