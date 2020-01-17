import React, { Component } from "react";
import { SearchBar } from "../search-bar/search-bar.component";
import { SortTitles } from "../sort-titles/sort-titles";
import { ListItemsContainer } from "../list-items-container/list-items-container.components";
import { Button } from "../button/button.component";
import "./modal.styles.css";

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            renderList: this.props.listItems,
            mode: props.mode,
            selctedItems: []
        };

        this.header =
            this.state.mode === "home"
                ? {
                      text: "Your List",
                      style: { marginLeft: "5%", marginRight: "2%" }
                  }
                : {
                      text:
                          "Select the anime you're about to watch! (We only show this once for each anime)",
                      style: { width: "100%", textAlign: "center" }
                  };
        this.titles =
            this.state.mode === "home"
                ? [
                      { text: "Title", buttons: false },
                      { text: "Episodes Watched", buttons: true },
                      { text: "Status", buttons: false },
                      { text: "Completion", buttons: true }
                  ]
                : [
                      { text: "Title" },
                      { text: "Total Episodes" },
                      { text: "Link to MAL" }
                  ];
    }

    filterList = e => {
        const term = e.target.value;
        const filteredList = this.props.listItems.filter(item =>
            item.title.toLowerCase().includes(term.toLowerCase())
        );
        this.setState({ renderList: filteredList });
    };

    addSelected = e => {
        let selectedItems = [...this.state.selctedItems];
        if (e.target.checked) {
            selectedItems.push(e.target);
        } else {
            selectedItems.splice(selectedItems.indexOf(e.target), 1);
        }
        this.setState({ selctedItems: selectedItems });
    };

    deleteSelected = () => {};

    componentDidUpdate() {
        if (
            this.props.listItems.searchResults &&
            this.props.listItems.searchResults !== this.state.renderList
        ) {
            this.setState({ renderList: this.props.listItems.searchResults });
        } else if (this.props.mode !== this.state.mode) {
            this.setState({ mode: this.props.mode });
        }
    }

    render() {
        console.log(this.state.renderList);
        switch (this.state.mode) {
            case "home":
                return (
                    <div className="modal-container">
                        <h1 style={this.header.style}>{this.header.text}</h1>
                        <SearchBar
                            mode={this.state.mode}
                            onChangeHandler={this.filterList}
                        />
                        <Button text="Edit" color="#7764e4" outline={true} />
                        <Button text="Delete" color="#cc3f29" outline={false} />
                        <SortTitles
                            mode={this.state.mode}
                            titles={this.titles}
                        />
                        <ListItemsContainer
                            listItems={this.state.renderList}
                            checkboxHandler={this.addSelected}
                        />
                    </div>
                );
            case "selection":
                return (
                    <div className="modal-container">
                        <h1 style={this.header.style}>{this.header.text}</h1>
                        <SearchBar
                            mode={this.state.mode}
                            onChangeHandler={this.filterList}
                        />
                        <SortTitles
                            mode={this.state.mode}
                            titles={this.titles}
                        />
                        <ListItemsContainer
                            mode={this.state.mode}
                            listItems={this.state.renderList}
                            checkboxHandler={this.addSelected}
                        />
                    </div>
                );
            default:
                return <div></div>;
        }
    }
}

export default Modal;
