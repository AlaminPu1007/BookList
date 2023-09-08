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

            // post method or add method of blog-post
            this.post('api/books/create', (schema, request) => {
                let items = JSON.parse(request.requestBody);

                return schema.blogPosts.create(items);
            });

            // Custom route handler for book search
            this.get('api/books/search', (schema, request) => {
                const searchText = request.queryParams.text;

                if (!searchText) {
                    // If no search text is provided, return an empty array
                    return [];
                }

                // Filter books based on the search text (case-insensitive)
                const matchingBooks = schema.blogPosts.all().filter(book => {
                    return book.title
                        .toLowerCase()
                        .includes(searchText.toLowerCase());
                });

                return matchingBooks;
            });

            // Delete item from list
            this.delete('api/books/delete/:id', (schema, request) => {
                const itemId = request.params.id;
                const findItem = schema.blogPosts.find(itemId);

                if (!findItem) {
                    return new Response(500, {
                        errors: ['Server did not respond'],
                    });
                }

                return schema.blogPosts.find(itemId).destroy();
            });

            // update specific post
            this.patch('api/books/update/:id', (schema, request) => {
                let items = JSON.parse(request.requestBody);
                let id = request.params.id;
                let book = schema.blogPosts.find(id);

                return book.update(items);
            });
        },
    });

    return server;
}
