import React, { Component } from 'react';

class AddProduct extends Component {
    state = {
        item_added: false
    };

    itemAdded() {
        if (this.state.item_added) {
            return <div className="alert alert-success" style={alertStyle}>Item added! Do you want to make another?</div>;
        } else {
            return <div className="alert alert-warning" style={alertStyle}>Add item</div>;
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.props.handleClick(e);
    }

    handleAddProduct = (e) => {
        e.preventDefault();
        this.props.handleAddProduct();
        this.setState({item_added: true});
    }

    render() { 
        return (
            <div className="add-item-container" style={containerStyle}>
                {this.itemAdded()}
                <div className="calc-buttons" style={calcStyle}>
                    <button id="add-btn" onClick={this.handleClick.bind(this)} className="btn btn-sm btn-secondary">+</button>
                    <button id="minus-btn" onClick={this.handleClick.bind(this)} className="btn btn-sm btn-secondary">-</button>
                    <span className="badge badge-primary" style={badeStyle}>{this.props.num}</span>
        <button onClick={this.handleAddProduct} className="btn btn-sm btn-info">Add Item{this.props.num > 1 ? 's' : ''}</button>
                </div>
            </div>
        );
    }
}

const badeStyle = {
    padding: '17.5px'
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
}

const alertStyle ={
    width: '80%'
}

const calcStyle ={
    width: '20%'
}

export default AddProduct;