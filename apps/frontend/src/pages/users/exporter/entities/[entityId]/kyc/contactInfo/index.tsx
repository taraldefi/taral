import ExporterKycLayout from "@components/layouts/exporter/exporterKycLayout";

function index() {
  return (
    <ExporterKycLayout>
      <div className="kycContainer">
        <div className="contInfo">
          <div className="mainWrapper">
            <div className="mainTitle">MAIN INFO</div>
            <div className="inputContainer">
              <span>Name</span>
              <input type="text" className="inputs" placeholder="John Smith" />
            </div>
            <div className="inputContainer">
              <span>Position</span>
              <input
                type="text"
                className="inputs"
                placeholder="Head of Marketing"
              />
            </div>
            <div className="inputContainer">
              <span>Email</span>
              <input
                type="text"
                className="inputs"
                placeholder="name@email.com"
              />
            </div>
            <div className="inputContainer">
              <span>Phone Number</span>
              <input type="text" className="inputs" placeholder="555-123-456" />
            </div>
            <div className="inputContainer">
              <span>Mobile</span>
              <input
                type="text"
                className="inputs"
                placeholder="01-555-123-456"
              />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="otherWrapper">
            <div className="mainTitle">OTHER INFO</div>
            <div className="inputContainer">
              <span>Additional Mobile(Optionl)</span>
              <input
                type="text"
                className="inputs"
                placeholder="Enter mobile number..."
              />
            </div>
            <div className="inputContainer">
              <span>Website (Optional)</span>
              <input
                type="text"
                className="inputs"
                placeholder="Website URL..."
              />
            </div>
          </div>
          <div className="dummyWrapper"></div>
        </div>
      </div>
    </ExporterKycLayout>
  );
}

export default index;
