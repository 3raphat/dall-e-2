import { useRouter } from "next/router";

const Print = () => {
  const router = useRouter();
  const { image } = router.query;

  return (
    <img
        src={image}
    />
  )
};

export default Print;
