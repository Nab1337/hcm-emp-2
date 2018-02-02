import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OgWorkPlaces } from './og-work-places.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OgWorkPlacesService {

    private resourceUrl =  SERVER_API_URL + 'api/og-work-places';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(ogWorkPlaces: OgWorkPlaces): Observable<OgWorkPlaces> {
        const copy = this.convert(ogWorkPlaces);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ogWorkPlaces: OgWorkPlaces): Observable<OgWorkPlaces> {
        const copy = this.convert(ogWorkPlaces);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OgWorkPlaces> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to OgWorkPlaces.
     */
    private convertItemFromServer(json: any): OgWorkPlaces {
        const entity: OgWorkPlaces = Object.assign(new OgWorkPlaces(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a OgWorkPlaces to a JSON which can be sent to the server.
     */
    private convert(ogWorkPlaces: OgWorkPlaces): OgWorkPlaces {
        const copy: OgWorkPlaces = Object.assign({}, ogWorkPlaces);

        copy.createdAt = this.dateUtils.toDate(ogWorkPlaces.createdAt);

        copy.updatedAt = this.dateUtils.toDate(ogWorkPlaces.updatedAt);
        return copy;
    }
}
