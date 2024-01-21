import { PortalIcons } from "@components/icons";
import { useModal } from "@utils/hooks";
import Image from "next/image";
import { DeleteModalAtom, EditFormModalAtom } from "@store/ModalStore";
import convertDate from "@utils/lib/convertDate";
import { Edit } from "react-feather";

interface infoType {
  id: string;
  name: string;
  logo: string;
  BeneficialOwner: string;
  CodeAbbreviation: string;
  Nationality: string;
  HeadquartersLocation: string;
  IndustryType: string;
  CoreBusiness: string;
  IncorporationDate: string;
  LegalForm: string;
  productCount: number;
  registrationNumber: string;
  applicationCount: number;
}
type Props = {
  infoData: infoType;
};
function EntityView({ infoData }: Props) {
  const deleteModal = useModal(DeleteModalAtom);
  const editModal = useModal(EditFormModalAtom);

  return (
    <>
      <div className="viewContent">
        <div className="detailsContainer">
          <div className="card">
            <div className="cardImage">
              <Image
                className="images"
                src={infoData.logo}
                alt=""
                width={200}
                height={200}
              ></Image>
            </div>
            <div className="right">
              <div className="mainTitle">
                <div>{infoData.name}</div>
                <div className="infoAction">
                  <div onClick={() => editModal.open(infoData.id)}>
                    <Edit></Edit>
                  </div>
                  <div
                    onClick={() => {
                      deleteModal.open(infoData.id);
                    }}
                  >
                    <PortalIcons selected={false} icon={"delete"}></PortalIcons>
                  </div>
                </div>
              </div>
              <div className="lower">
                <div className="registration">
                  <span>REGISTRATION NUMBER</span>
                  <span>{infoData.registrationNumber}</span>
                </div>
                <div className="products">
                  <span>PRODUCTS</span>
                  <span>{infoData.productCount}</span>
                </div>
                <div className="applications">
                  <span>APPLICATIONS</span>
                  <span>{infoData.applicationCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="informationsContainer">
          <div className="informationContent">
            <div className="infoItem">
              <div className="leftInfo">
                <span>Beneficial Owner</span>
              </div>
              <div className="rightInfo">
                <span>{infoData.BeneficialOwner}</span>
              </div>
            </div>
            <div className="infoItem">
              <div className="leftInfo">
                <span>Code/Abbreviation</span>
              </div>
              <div className="rightInfo">
                <span>{infoData.CodeAbbreviation}</span>
              </div>
            </div>
            <div className="infoItem">
              <div className="leftInfo">
                <span>Nationality</span>
              </div>
              <div className="rightInfo">
                <span>{infoData.Nationality}</span>
              </div>
            </div>
            <div className="infoItem">
              <div className="leftInfo">
                <span>Headquarters Location</span>
              </div>
              <div className="rightInfo">
                <span>{infoData.HeadquartersLocation}</span>
              </div>
            </div>
            <div className="infoItem">
              <div className="leftInfo">
                <span>Industry Type</span>
              </div>
              <div className="rightInfo">
                <span>{infoData.IndustryType}</span>
              </div>
            </div>
            <div className="infoItem">
              <div className="leftInfo">
                <span>Core Business</span>
              </div>
              <div className="rightInfo">
                <span>{infoData.CoreBusiness}</span>
              </div>
            </div>
            <div className="infoItem">
              <div className="leftInfo">
                <span>Incorporation Date</span>
              </div>
              <div className="rightInfo">
                <span>{convertDate(infoData.IncorporationDate)}</span>
              </div>
            </div>
            <div className="infoItem">
              <div className="leftInfo">
                <span>Legal Form</span>
              </div>
              <div className="rightInfo">
                <span>{infoData.LegalForm}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EntityView;
