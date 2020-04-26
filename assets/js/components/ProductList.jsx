import React, { Component } from 'react';
import ProductListItem from './ProductListItem';

class ProductList extends Component {
    state = { 

    };

    render() { 
        return (
            <div className="product-list-container">
                <ul className="list-group">
                    {this.props.products.map((product) => (
                        <ProductListItem
                            key={product.id}
                            product={product}
                            handleUpdate={this.props.handleUpdate}
                            handleDelete={this.props.handleDelete}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}
 
export default ProductList;