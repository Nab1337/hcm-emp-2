import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OgOrgWorkPlaces } from './og-org-work-places.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OgOrgWorkPlacesService {

    private resourceUrl =  SERVER_API_URL + 'api/og-org-work-places';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(ogOrgWorkPlaces: OgOrgWorkPlaces): Observable<OgOrgWorkPlaces> {
        const copy = this.convert(ogOrgWorkPlaces);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ogOrgWorkPlaces: OgOrgWorkPlaces): Observable<OgOrgWorkPlaces> {
        const copy = this.convert(ogOrgWorkPlaces);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OgOrgWorkPlaces> {
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
     * Convert a returned JSON object to OgOrgWorkPlaces.
     */
    private convertItemFromServer(json: any): OgOrgWorkPlaces {
        const entity: OgOrgWorkPlaces = Object.assign(new OgOrgWorkPlaces(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a OgOrgWorkPlaces to a JSON which can be sent to the server.
     */
    private convert(ogOrgWorkPlaces: OgOrgWorkPlaces): OgOrgWorkPlaces {
        const copy: OgOrgWorkPlaces = Object.assign({}, ogOrgWorkPlaces);

        copy.createdAt = this.dateUtils.toDate(ogOrgWorkPlaces.createdAt);

        copy.updatedAt = this.dateUtils.toDate(ogOrgWorkPlaces.updatedAt);
        return copy;
    }
}
