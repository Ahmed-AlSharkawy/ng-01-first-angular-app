import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Subject, tap, throwError } from "rxjs";
import { Server } from "./server";

@Injectable({ providedIn: 'root' })
export class ServersService {
  private servers: Server[];
  private static lastID = 4;
  error = new Subject<any>();
  success = new Subject<any>();

  constructor(private http: HttpClient) {

  }

  getServers() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('key', 'value');
    return this.http
      .get('https://ng-first-http-project-default-rtdb.firebaseio.com/servers.json',
        {
          headers: new HttpHeaders({ 'header-key': 'Header Value' }),
          params: searchParams
        })
      .pipe(map(response => {
        let serversArray: Server[] = [];
        for (const id in response)
          if (response.hasOwnProperty(id)) serversArray.push({ id, ...response[id] });

        return serversArray;
      }));
  }

  getServer(id: string) {

    return this.http
      .get('https://ng-first-http-project-default-rtdb.firebaseio.com/servers/' + id + '.json')
      .pipe(map(response => {
        let instanceType = response['instanceType'];
        let name = response['name'];
        let started = response['started'];
        let status = response['status'];

        return { id, instanceType, name, started, status };
      }))
  }

  updateServer(id: string, server: { instanceType: string, name: string, status: string, started: string }) {
    this.http
      .put('https://ng-first-http-project-default-rtdb.firebaseio.com/servers/' + id + '.json', server, {
        observe: 'response'
      })
      .subscribe(response => this.success.next({ ...response, body: { name: id } }), error => this.error.next(error));
  }

  addServer(server: { instanceType: string, name: string, status: string, started: string }) {
    this.http
      .post('https://ng-first-http-project-default-rtdb.firebaseio.com/servers.json', server, {
        observe: 'response'
      })
      .subscribe(response => this.success.next(response), error => this.error.next(error));
  }

  deleteServer(id: string) {
    return this.http
      .delete('https://ng-first-http-project-default-rtdb.firebaseio.com/servers/' + id + '.json', {
        observe: 'events'
      })
      .pipe(catchError(error => throwError(() => {
        return {
          header: error.name,
          title: error.status + " - " + error.statusText,
          message: error.message
        }
      })), tap(event => {
        if (event.type === HttpEventType.Response)
          this.success.next({ ...event, body: { name: id } });
      }));
  }

  deleteServers() {
    return this.http
      .delete('https://ng-first-http-project-default-rtdb.firebaseio.com/servers.json')
      .pipe(catchError(error => throwError(() => {
        return {
          header: error.name,
          title: error.status + " - " + error.statusText,
          message: error.message
        }
      })));
  }
}
