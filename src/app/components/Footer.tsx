import Image from "next/image"

export default function Footer() {

  return (
    <>
      <Image
        src="/spillere/frede.png"
        alt="Frede på dass"
        width={160}
        height={160}
        className="mb-5 fixed left-[-30px] bottom-[-30px]"
      />

      <Image
        src="/spillere/chrizz.png"
        alt="Frede på dass"
        width={160}
        height={160}
        className="mb-5 fixed right-[-30px] bottom-[-30px]"
      />

      <Image
        src="/spillere/ek.png"
        alt="Frede på dass"
        width={160}
        height={160}
        className="mb-5 fixed right-40 bottom-[-30px]"
      />

      <Image
        src="/spillere/lars.png"
        alt="Frede på dass"
        width={160}
        height={160}
        className="mb-5 fixed left-40 bottom-[-30px]"
      />

      <Image
        src="/spillere/giant.png"
        alt="Frede på dass"
        width={160}
        height={160}
        className="mb-5 fixed left-80 bottom-[-80px]"
      />

      <Image
        src="/spillere/hans.png"
        alt="Frede på dass"
        width={160}
        height={160}
        className="mb-5 fixed right-80 bottom-[-100px]"
      />
    </>
  )
}