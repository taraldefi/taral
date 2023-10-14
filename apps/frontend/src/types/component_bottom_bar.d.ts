export type BottomBarProps = {
  onSubmit: () => void;
  onBack: () => void;
};

export enum BottomBarType {
  EXPORTER = "EXPORTER",
  IMPORTER = "IMPORTER",
}
