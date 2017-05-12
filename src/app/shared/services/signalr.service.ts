import { Injectable, EventEmitter } from '@angular/core';
import { ConfigService } from '../utils/config.service';

@Injectable()
export class SignalrService {

  private proxy: any;
  private proxyName: string = 'CheckchartHubs';
  private connection: any;
  public connectionEstablished: EventEmitter<Boolean>;
  public connectionExists: Boolean;
  public Checkchartchanged: EventEmitter<any>;

  constructor(private configService: ConfigService) {
    this.Checkchartchanged = new EventEmitter();
    this.connectionEstablished = new EventEmitter<Boolean>();
    this.connectionExists = false;
    this.connection = $.hubConnection(this.configService._apiURICheckchart.replace('api', 'signalr'));
    this.proxy = this.connection.createHubProxy(this.proxyName);

    this.registerOnServerEvents();

    this.startConnection();

  }

  private startConnection(): void {
    this.connection.start().done((data: any) => {
      console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
      this.connectionEstablished.emit(true);
      this.connectionExists = true;
    }).fail((error: any) => {
      console.log('Could not connect ' + error);
      this.connectionEstablished.emit(false);
    });
  }

  private registerOnServerEvents(): void {
    this.proxy.on('AnAdded', (data: any) => {
      this.Checkchartchanged.emit('AnAdded');
    });

    this.proxy.on('AnUpdated', (data: any) => {
      this.Checkchartchanged.emit('AnUpdated');
    });

    this.proxy.on('AnDeleted', (data: any) => {
      this.Checkchartchanged.emit('AnDeleted');
    });
  }
}