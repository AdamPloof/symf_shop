import React, { Component } from 'react';

class ProductListItem extends Component {
    state = {  };
     
    render() {
        const product = this.props.product; 
        const { name, size, price } = product;
        return (                         
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="product-info ">
                    {name} - <small>size: {size}</small> - ${price / 100}
                </div>
                <div className="product-btns">
                    <button 
                        data-toggle="modal" 
                        data-target="#productModal" 
                        onClick={this.props.handleUpdate.bind(this, product)} 
                        className="btn btn-secondary btn-sm" 
                        style={btnStyle}
                    >
                        Update
                    </button>
                    <button 
                        data-toggle="modal" 
                        data-target="#productModal" 
                        onClick={this.props.handleDelete.bind(this, product)} 
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                </div>
            </li> 
        );
    }
}
 
const btnStyle = {
    marginRight: '6px'
};

export default ProductListItem;