import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { io } from 'socket.io-client';

@Injectable()
export class AppService implements OnModuleInit {
  socket: any;

  logger: Logger = new Logger('AppService');

  getHello(): string {
    return 'Hello World!';
  }

  sendMessage(message: string) {
    this.logger.log(`sending message ${message}`);
    this.socket.emit('message', message);
  }

  async onModuleInit() {
    this.socket = io('https://trevvo-api-hml.scoder.com.br');
    this.socket.on('connect', () => {
      this.logger.log('connected');
    });
    this.socket.on('disconnect', () => {
      this.logger.log('disconnected');
    });
    this.socket.on('message', (data) => {
      this.logger.log(data);
    });
    this.socket.on('cart.paid:adf635a1-b4a3-427b-b32a-cebbecb50699', (data) => {
      this.logger.log(`cart.paid: ${JSON.stringify(data)} .`);
    });

    this.socket.on('error', (err) => {
      this.logger.error(err);
    });

    this.logger.log('init', this.socket.id);
  }
}
