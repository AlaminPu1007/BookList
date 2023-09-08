/**
 * description :- Create global file of server
 * @author {ALAMIN}
 * @created_by :- {ALAMIN}
 * @created_at :- 07/09/2023 23:12:05
 */
import {createServer, Model} from 'miragejs';
import book_list from './local-json/book_list.json';

export function MakeServer({environment = 'test'} = {}) {
    let server = createServer({
        environment,

        models: {
            books: Model,
        },

        routes() {
            this.namespace = 'api';

            this.get('/books', schema => {
                return book_list;
            });
        },
    });

    return server;
}
