import socket from 'socket.io';
import constants from '../../frontend/js/constants/events';
import webConfig from '../../frontend/js/constants/config';
import clientsStore from '../model/clients';

let io;
let clients = [];

export default {
    init(server) {
        io = socket(server);
        io.on(webConfig.EVENT_CONNECTION, client => {
            console.log("client connected");
            clients.push(client);

            clientsStore.addClient(client);
        })
    },

    emit(event, data) {
        for(let key in clients) {
            this.emitToOne(clients[key], event, data);
        }
    },

    emitToOne(client, event, data) {
        client.emit(event, data);
    }
}