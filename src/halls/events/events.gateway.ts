import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { EventsService } from './events.service';
import { Server, Socket } from 'socket.io';
import { gatewayAuthentication } from './middleware/authentication.middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {
  constructor(
    private readonly eventsService: EventsService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  afterInit(server: Server) {
    server.use(gatewayAuthentication(this.jwtService, this.authService));
  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() body: unknown, @ConnectedSocket() client: Socket) {
    console.log(body, client['user']);
  }
}
