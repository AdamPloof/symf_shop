import React, { Component } from 'react';

class ProductModal extends Component {
    // TODO: refactor passing the individual attributes of the product around
    // and just pass the product object.
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.selectedProduct
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedProduct !== prevProps.selectedProduct) {
            this.setState({product: this.props.selectedProduct})
        }
    }

    handleNameChange(e) {
        let updates = {name: e.target.value}
        this.props.handleProductUpdate(updates);
    }

    handleSizeChange(e) {
        let updates = {size: e.target.value}
        this.props.handleProductUpdate(updates);
    }

    handlePriceChange(e) {
        let updates = {price: e.target.value * 100}
        this.props.handleProductUpdate(updates);
    }

    getUpdateForm() {
        const { name, size, price } = this.state.product;

        if (this.props.update) {
            return (
                <form>
                    <div className="form-row">
                        <div className="col-7">
                            <label htmlFor="prodName">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="prodName" 
                                value={name}
                                onChange={this.handleNameChange.bind(this)}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="prodSize">Size</label>
                            <select 
                                id="prodSize" 
                                className="form-control"
                                value={(size) ? size : 1 }
                                onChange={this.handleSizeChange.bind(this)}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="prodPrice">Price</label>
                            <input 
                                id="prodPrice" 
                                type="text" 
                                className="form-control" 
                                value={(price) ? (price / 100) : 0}
                                onChange={this.handlePriceChange.bind(this)}
                            />
                        </div>
                    </div>
                </form>
            );
        } else {
            return (
                <p>Are you sure you want to {this.props.update ? 'update': 'delete'} <strong>{name}</strong>?</p>
            )
        }
    }

    getSubmitBtn() {
        const id = this.state.product.id;

        if (this.props.update) {
            return <button onClick={this.props.submitUpdate.bind(this, this.state.product)} type="button" className="btn btn-primary">Save changes</button>;
        } else {
            return <button onClick={this.props.submitDelete.bind(this, id)} type="button" className="btn btn-danger">Delete item</button>;
        }
    }

    render() {
        return ( 
            <div className="modal fade" id="productModal" tabIndex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="productModalLabel">{this.props.update ? 'Update': 'Delete'} Product</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.getUpdateForm()}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        {this.getSubmitBtn()}
                    </div>
                    </div>
                </div>
            </div> 
        );
    }
}
 
export default ProductModal;