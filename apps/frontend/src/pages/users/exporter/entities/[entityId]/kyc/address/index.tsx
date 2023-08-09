import KYCLayout from "@components/layouts/kycLayout";

function index() {
  return (
    <KYCLayout>
      <div className="kycContainer">
        <div className="outerContainerKyc">
          <div className="innerContainer1">
            <div className="mainTitle">ADDRESS</div>
            <div className="inputContainer">
              <span>City</span>
              <select className="inputs" name="" id="">
                <option value="">Berlin</option>
              </select>
            </div>
            <div className="inputContainer">
              <span>District</span>
              <input type="text" className="inputs" placeholder="Lichtenberg" />
            </div>
            <div className="inputContainer">
              <span>Street Name</span>
              <input
                type="text"
                className="inputs"
                placeholder="Albert-Hößler-Straße"
              />
            </div>
            <div className="inputContainer">
              <span>Post code</span>
              <input type="text" className="inputs" placeholder="95192" />
            </div>
            <div className="inputContainer">
              <span>Unit Number</span>
              <input type="text" className="inputs" placeholder="589-B" />
            </div>
            <div className="inputContainer">
              <span>Building Number</span>
              <input type="text" className="inputs" placeholder="17" />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="innerContainer2">
            <div className="mainTitle">ADDITIONAL INFO</div>
            <div className="inputContainer">
              <span>Purpose of required product</span>
              <input
                type="text"
                className="inputs"
                placeholder="Business expansion in Europe"
              />
            </div>
            <div className="inputContainer">
              <span>Source of funds to be used in future repayments</span>
              <input
                type="text"
                className="inputs"
                placeholder="Future revenue"
              />
            </div>
          </div>
          <div className="dummyWrapper"></div>
        </div>
      </div>
    </KYCLayout>
  );
}

export default index;
