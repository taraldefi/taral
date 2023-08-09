import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { Button } from "taral-ui";
import React from "react";

function Index() {
  return (
    <ApplicationLayout>
      <div className="ptContainer">
        <div className="productContainer">
          <div className="maintitle">PRODUCTS</div>
          <div className="selectBack">
            <div className="maintitle">PRODUCTS #1</div>
            <div className="rowBox">
              <div className="inputContainer">
                <span>Product Name</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Product name..."
                />
              </div>
              <div className="inputContainer">
                <span>Quantity</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Quantity..."
                />
              </div>
              <div className="inputContainer">
                <span>Unit Price</span>
                <select name="" className="inputs" id="">
                  <option id="">Unit Price</option>
                </select>
              </div>
            </div>
          </div>
          <div className="selectBack">
            <div className="maintitle">PRODUCTS #1</div>
            <div className="rowBox">
              <div className="inputContainer">
                <span>Product Name</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Product name..."
                />
              </div>
              <div className="inputContainer">
                <span>Quantity</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Quantity..."
                />
              </div>
              <div className="inputContainer">
                <span>Unit Price</span>
                <select name="" className="inputs" id="">
                  <option id="">Unit Price</option>
                </select>
              </div>
            </div>
          </div>
          <Button label={"+ Add Product"} onClick={() => {}}></Button>
        </div>
        <div className="vLine"></div>
        <div className="portContainer">
          <div className="maintitle">PORTS</div>
          <div className="inputContainer">
            <span>Port of Export</span>
            <input
              type="text"
              className="inputs"
              id="search"
              placeholder="Search ports..."
            />
          </div>
          <div className="inputContainer">
            <span>Port of Import</span>
            <input
              type="text"
              className="inputs"
              id="search"
              placeholder="Search ports..."
            />
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </ApplicationLayout>
  );
}

export default Index;
