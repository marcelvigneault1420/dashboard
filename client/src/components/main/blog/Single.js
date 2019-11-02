import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
function Single(props) {
    let match = useRouteMatch();
    let { idBlog } = useParams();
    if (props.id !== undefined) {
        idBlog = props.id;
    }
    return (
        <article>
            <Link
                to={
                    `${match.url}` +
                    (props.id !== undefined ? `/${idBlog}` : '')
                }
            >
                <h2>This is post num {idBlog}</h2>
            </Link>
            <p>
                Eiusmod est laborum veniam esse ipsum cupidatat mollit. Aliquip
                elit fugiat eu reprehenderit fugiat sint do sunt occaecat
                cupidatat adipisicing duis deserunt pariatur. Velit enim
                adipisicing esse ad qui eiusmod velit velit Lorem enim et.
            </p>
            <p>
                Laborum et dolore commodo veniam cupidatat officia do sunt
                deserunt ex qui sint eiusmod. Est minim reprehenderit excepteur
                esse. Qui labore occaecat ipsum Lorem laborum eiusmod. Et sint
                ad amet cillum ut qui adipisicing amet duis ullamco adipisicing.
            </p>
        </article>
    );
}

export default Single;
