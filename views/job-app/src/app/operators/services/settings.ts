import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs'
import 'rxjs/add/operator/map';


@Injectable()
export class SettingsService {

    private _settingSubject: BehaviorSubject<ISetting> = new BehaviorSubject(NULLSETTINGS);
    public readonly setting = this._settingSubject.asObservable();

    constructor(private _http: Http) {
    }

    setoperatorStatusSettings(operatorsStatusSettingObj) {
        for(var prop in operatorsStatusSettingObj){
            if(operatorsStatusSettingObj[prop] === ''){
                operatorsStatusSettingObj[prop] = false;
                continue;
            }
        }
        this._settingSubject.next(operatorsStatusSettingObj);
    }
}

export interface ISetting {
    machining: boolean;
    quality: boolean;
    shipping: boolean;
    staging: boolean;
    waiting: boolean;
}

export const NULLSETTINGS = {
    machining: false,
    quality: false,
    shipping: false,
    staging: false,
    waiting: false
}




