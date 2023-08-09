import { PortalIcons } from "@components/icons";
import { useAtom } from "jotai";
import React from "react";
import { itemExpanded } from "@store/sideBarStore";

interface menuItemProps {
  id: number;
  title: string;
  children?: React.ReactNode;
  icon: string;
  onClick?: (e: any) => void;
}

const MenuItem: React.FC<menuItemProps> = ({
  id,
  title,
  children,
  icon,
  onClick,
}) => {
  const [expandedItemId, setExpandedItemId] = useAtom(itemExpanded);
  const isExpanded = id === expandedItemId;

  const toggleExpand = () => {
    // Prevent click event from propagating to child elements

    setExpandedItemId(isExpanded ? -1 : id);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className="menuItemContainer">
      <div
        onClick={handleClick}
        className={`titleContainer ${isExpanded && "titleContainer selected"}`}
      >
        <PortalIcons icon={icon} selected={isExpanded} />
        <span onClick={toggleExpand}> {title}</span>
      </div>
      <div className={`expandableDiv ${isExpanded && "expanded"}`}>
        <div className="expandableContent">{children}</div>
      </div>
    </div>
  );
};

export default MenuItem;
