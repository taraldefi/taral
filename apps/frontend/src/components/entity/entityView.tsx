import { PortalIcons } from "@components/icons";
import { Button } from "taral-ui";
import { useModal } from "@utils/hooks";
import Image from "next/image";
import { DeleteModalAtom, EditFormModalAtom } from "@store/ModalStore";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { EntityDeletedAtom } from "@store/entityStore";
import convertDate from "@utils/lib/convertDate";

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
}
type Props = {
  infoData: infoType;
};
function EntityView({ infoData }: Props) {
  const deleteModal = useModal(DeleteModalAtom);
  const editModal = useModal(EditFormModalAtom);
  const router = useRouter();
  const [entityDeleted] = useAtom(EntityDeletedAtom);

  return (
    <>
      <div className="viewContent">
        <div className="detailsContainer">
          <span>Details</span>
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
                <span>{infoData.name}</span>
              </div>
              <div className="lower">
                <div className="registration">
                  <span>REGISTRATION NUMBER</span>
                  <span>1214325136</span>
                </div>
                <div className="products">
                  <span>PRODUCTS</span>
                  <span>{infoData.productCount}</span>
                </div>
                <div className="applications">
                  <span>APPLICATIONS</span>
                  <span>39</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="informationsContainer">
          <span>Information</span>
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
          <div className="infoAction">
            <div
              onClick={() => {
                deleteModal.open(infoData.id);
                if (entityDeleted)
                  router.push(
                    `/users/${router.asPath.split("/")[2]}/entities/`
                  );
              }}
            >
              <PortalIcons selected={false} icon={"delete"}></PortalIcons>
            </div>
            <Button
              label={"Edit Entity"}
              onClick={() => editModal.open(infoData.id)}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EntityView;
