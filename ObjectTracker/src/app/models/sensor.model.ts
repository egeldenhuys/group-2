import { SensorResponse } from './sensor-response.model';
import { Observable } from 'rxjs';

/**
 * Sensor config
 */
export interface Sensor {
    ID: number;
    Name: string,
    Country: string,
}
