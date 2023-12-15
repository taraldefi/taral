interface Props {
  fileUrl: string;
}
export const DisplayThumbnail = ({ fileUrl }: Props) => {
  return (
    <>
      <object className="object" data={fileUrl} type="application/octet-stream"></object>
    </>
  );
};
