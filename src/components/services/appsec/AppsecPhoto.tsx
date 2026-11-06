import Image from "next/image";

type AppsecPhotoProps = {
  src: string;
  alt: string;
};

export default function AppsecPhoto({ src, alt }: AppsecPhotoProps) {
  return (
    <figure className="as-photo">
      <Image src={src} alt={alt} fill sizes="(max-width: 800px) 100vw, 460px" />
    </figure>
  );
}
