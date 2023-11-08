type Props = {
  //TODO: fetch applications
  applications: any[];
};

const RepaymentTopNavRightComponent = ({ applications }: Props) => {
  return (
    <>
      <div className="viewEntitySelect">
        <select
          onChange={(e) => {
            console.log(e.target.value);
            // setCurrentSelectedEntity(e.target.value);
            // router.replace({
            //   pathname: `/users/importer/entities/${e.target.value}/overview`,
            // });
          }}
          name=""
          id=""
          className="inputs"
        >
          {applications &&
            applications.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.applicationNumber}
                </option>
              );
            })}
        </select>
      </div>
    </>
  );
};

export default RepaymentTopNavRightComponent;
