import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import List from './List';
import Single from './Single';

function Blog() {
    let match = useRouteMatch();

    return (
        <section>
            <h1>Blog</h1>

            <Switch>
                <Route path={`${match.path}/:idBlog`}>
                    <Single></Single>
                </Route>
                <Route path={match.path}>
                    <List />
                </Route>
            </Switch>
        </section>
    );
}

export default Blog;
