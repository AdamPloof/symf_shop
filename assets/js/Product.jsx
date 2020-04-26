import React, { Component } from 'react';
import ReactDom from 'react-dom';

import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal'

class Product extends Component {
    state = {
        num: 0, 
        products: [],
        selectedProduct: { 
            // Providing default values for selectedProduct so modal is initalized as controlled component
            id: 0,
            name: "",
            size: 0,
            price: 0,
        },
        update: false,
        delete: false
    };

    componentDidMount() {
        this.getProducts().then((data) => this.setState({
            products: [...this.state.products, ...data]}));
    }

    getProducts() {
        let url = new URL('http://127.0.0.1:8000/products-list');
        let request = new XMLHttpRequest;

        return new Promise(function(resolve, reject) {
            request.onload = function() {
                let data = request.response;
                if (this.status == 200) {
                    resolve(data);
                } else {
                    reject("Could not retrieve data");
                }
            }

            request.responseType = 'json';
            request.open('GET', url.toString(), true);
            request.send();
        });
    }

    handleClick(e) {
        if (e.target.id === "add-btn") {
            this.setState({num: this.state.num + 1});
        } else if (this.state.num > 0) {
            this.setState({num: this.state.num - 1});
        }
    }

    handleAddProduct() {
        this.createProducts().then((data) => this.setState({products: [...this.state.products, ...data]}));
        this.setState({num: 0});
    }

    handleUpdate = (product) => {
        this.setState({
            selectedProduct: product, 
            update: true, 
            delete: false, 
        });
    }
    

    handleProductUpdate = (updates) => {
        let key = Object.keys(updates)[0];

        this.setState(state => {
            let product = Object.assign({}, state.selectedProduct);
            product[key] = updates[key];
            return { 
                selectedProduct: product,
            };
        });
    }


    handleDelete = (product) => {
        this.setState({selectedProduct: product, delete: true, update: false});
    }

    submitDelete = (id) => {
        this.deleteProduct(id).then(() => this.setState({
            products: [...this.state.products.filter(product => product.id !== id)]
        }));

        this.closeModal();
    }

    submitUpdate = (product) => {
        // In proccess
        // TODO: This is where I currently left off. Need to add update product method and
        // associated controller. Also need to make these request POST instead of GET
        // lastly, learn the fetch API so I can stop using XMLHttpRequest
        this.updateProduct(product)
            .then((data) => this.setState({
                products: [...this.state.products.map(p => {
                    if (data.id == p.id) {
                        return data;
                    } else {
                        return p;
                    }
                })]
            }));
        this.closeModal();
    }

    closeModal() {
        $('#productModal').modal('hide');
    }

    // TODO: Combine the product update/deleting into one function and use POST requests
    createProducts() {
        let url = new URL('http://127.0.0.1:8000/products-create/');
        // let url = new URL('https://jsonplaceholder.typicode.com/albums');
        let params = new URLSearchParams;
        params.append('cnt', this.state.num);
        url.search = params.toString();

        let request = new XMLHttpRequest;

        return new Promise(function(resolve, reject) {
            request.onload = function() {
                let data = request.response;
                
                if (this.status == 200) {
                    resolve(data);
                } else {
                    reject("Could not retrieve data");
                }
            }

            request.responseType = 'json';
            request.open('GET', url.toString(), true);
            request.send();
        });
    }

    deleteProduct(id) {
        let url = new URL('http://127.0.0.1:8000/products-delete/' + id);
        let request = new XMLHttpRequest;

        return new Promise(function(resolve, reject) {
            request.onload = function() {
                let data = request.response;
                
                if (this.status == 200) {
                    resolve(data);
                } else {
                    reject("Could not retrieve data");
                }
            }

            request.responseType = 'json';
            request.open('GET', url.toString(), true);
            request.send();
        });
    }

    getProductChanges(product) {
        let updates = {};
        let prevProduct = this.state.products.filter((p) => p.id == product.id);

        for (const [key, val] of Object.entries(prevProduct[0])) {
            if (val != product[key]) {
                updates[key] = product[key];
            }
        }
        
        return updates;
    }

    updateProduct(product) {
        let id = product.id;
        let url = new URL('http://127.0.0.1:8000/products-update/' + id)
        let request = new XMLHttpRequest;

        let updates = this.getProductChanges(product);
        let body = JSON.stringify(updates);

        return new Promise(function(resolve, reject) {
            request.onload = function() {
                let data = request.response;

                if (this.status === 200) {
                    resolve(data);
                } else {
                    reject('Could not complete update request');
                }
            }

            request.responseType = 'json';
            request.open('POST', url.toString(), true);
            request.setRequestHeader('Content-Type', 'application/json' )
            request.send(body);
        });
    }

    render() { 
        return ( 
        <React.Fragment>
            <AddProduct 
                num={this.state.num}
                handleClick={this.handleClick.bind(this)} 
                handleAddProduct={this.handleAddProduct.bind(this)} 
            />

            <ProductList 
                products={this.state.products}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
            />

            <ProductModal
                selectedProduct={this.state.selectedProduct}
                update={this.state.update}
                delete={this.state.delete}
                handleProductUpdate={this.handleProductUpdate}
                submitUpdate={this.submitUpdate}
                submitDelete={this.submitDelete}
            />
        </React.Fragment> 
        );
    }
}
 
ReactDom.render(<Product />, document.getElementById("products"))