import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Server } from '../shared/server';
import { ServersService } from '../shared/servers.service';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit, OnDestroy {
  serversForm: FormGroup;
  formResults = {
    name: '', instanceType: 'small', status: 'stable',
    started: new Date().toLocaleDateString('en-CA')
  };

  isUpdate: boolean = false;
  server: Server = null;

  temp = ''
  states: string[];
  types: string[];
  isFetching: boolean = false;
  message: { header: string, title: string, message: string, type: string, icon: string } = null;
  messageSubscribtion: Subscription;

  servers: Server[];
  statuses: string[];
  currentStatues: string;
  appStatues = new Promise((resolve, reject) =>
    setTimeout(() =>
      resolve(this.currentStatues ? this.currentStatues : 'General'), 2000
    )
  );

  constructor(private serversService: ServersService, private http: HttpClient) {
    this.fetchData();

    this.statuses = ['', 'stable', 'offline', 'critical'];
    this.currentStatues = '';
    this.states = ['stable', 'offline', 'critical'];
    this.types = ['small', 'medium', 'large'];
  }

  ngOnInit() {
    this.messageSubscribtion = this.serversService.error.subscribe(error => this.setMessage(error, 'error'));
    this.messageSubscribtion = this.serversService.success.subscribe(response => this.setMessage(response, 'success', "ID: " + response.body.name));
    this.serversForm = new FormGroup({
      name: new FormControl('', Validators.required),
      instanceType: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      started: new FormControl('', [Validators.required]),
    });

    this.serversForm.valueChanges.subscribe(value => console.log(value));
    this.serversForm.statusChanges.subscribe(state => console.log(state));
    this.serversForm.setValue(this.formResults);
  }

  ngOnDestroy(): void {
    this.messageSubscribtion.unsubscribe();
  }

  getListClasses(server: Server) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical',
    }
  }

  getBadgeClasses(server: Server) {
    return {
      'text-success': server.status === 'stable',
      'text-warning': server.status === 'offline',
      'text-danger': server.status === 'critical',
    }
  }

  getFilterClasses(status?: string) {
    if (status == undefined)
      return {
        'bg-primary': this.currentStatues === '',
        'bg-success': this.currentStatues === 'stable',
        'bg-warning': this.currentStatues === 'offline',
        'bg-danger': this.currentStatues === 'critical',
      }
    return {
      'bg-primary': status === '',
      'bg-success': status === 'stable',
      'bg-warning': status === 'offline',
      'bg-danger': status === 'critical',
    }
  }

  getCardBorderClasses() {
    return {
      'border-primary': this.currentStatues === '',
      'border-success': this.currentStatues === 'stable',
      'border-warning': this.currentStatues === 'offline',
      'border-danger': this.currentStatues === 'critical',
    }
  }

  filterServers(status: string) {
    this.currentStatues = status;
    this.appStatues = new Promise((resolve, reject) =>
      resolve(this.currentStatues ? this.currentStatues : 'General')
    );
  }

  onSubmit() {
    if (this.serversForm.invalid) return;

    this.isFetching = true;
    if (this.isUpdate) {
      this.serversService.updateServer(this.server.id, this.serversForm.value);
      this.isUpdate = false;
      this.server = null;
    } else {
      this.serversService.addServer(this.serversForm.value);
    }

    this.serversForm.reset(this.formResults);
    this.isFetching = false;
  }

  private fetchData() {
    this.isFetching = true;

    this.serversService.getServers().subscribe(servers => {
      this.message = null;
      this.isFetching = false;
      this.servers = servers;
    }, error => {
      this.isFetching = false;
      this.setMessage(error, 'error');
    });
  }

  deleteServer(id: string) {
    if (confirm("Are you sure to delete server with key: " + id + "?"))
      this.serversService.deleteServer(id).subscribe(response => console.log(response), error => {
        this.message = { ...error, type: 'danger', icon: 'bug' };
      });
  }

  deleteServers() {
    if (confirm("Are you sure to delete all servers?"))
      this.serversService.deleteServers().subscribe(response => {
        this.message = { header: 'SUCCESS', title: '200 - OK', message: 'All servers have been deleted successfuly.', type: 'success', icon: 'check2-circle' }
      }, error => {
        this.message = { ...error, type: 'danger', icon: 'bug' };
      });
  }

  updateServer(id: string) {
    this.isUpdate = true;
    this.isFetching = true
    this.serversService.getServer(id).subscribe(response => {
      this.server = response;
      this.serversForm.reset(response)
      this.isFetching = false
    });
  }

  removeMessage() {
    this.message = null;
    this.fetchData();
  }

  setMessage(message: any, type: string, messageText?: string) {
    this.message = {
      header: message.name ? message.name : type.toUpperCase(),
      title: message.status + " - " + message.statusText,
      message: messageText ? messageText : message.message ? message.message : type.toUpperCase(),
      type: '',
      icon: ''
    };
    if (type == 'error') {
      this.message.type = 'danger';
      this.message.icon = 'bug';
    }
    else if (type == 'success') {
      this.message.type = 'success';
      this.message.icon = 'check2-circle';
    }
  }
}
