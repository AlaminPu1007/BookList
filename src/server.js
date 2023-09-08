/**
 * description :- Create global file of server
 * @author {ALAMIN}
 * @created_by :- {ALAMIN}
 * @created_at :- 07/09/2023 23:12:05
 */
import book_list from './local-json/book_list.json';
import {Server, Model, Response} from 'miragejs';

export function MakeServer({environment = 'development'} = {}) {
    let server = new Server({
        environment,

        models: {
            blogPost: Model,
        },

        seeds(server) {
            for (let i = 0; i < book_list?.length; i++) {
                server.schema.blogPosts.create(book_list[i]);
            }
        },

        routes() {
            // get a list of books
            this.get('/api/books', schema => {
                return schema.blogPosts.all();
            });

            // get specific post
            this.get('/api/books-by-id/:id', (schema, req) => {
                const findItem = schema.blogPosts.find(req.params.id);
                if (!findItem) {
                    return new Response(404, {}, {error: 'Book not found'});
                }
                return schema.blogPosts.find(req.params.id);
            });
        },
    });

    return server;
}
