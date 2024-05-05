import { motion } from 'framer-motion';
import Image from 'next/image';
import FlowLogo from "/public/FlowLogo.png";

type AnimationCompleteHandler = () => void;

const CentralLogo = ({ onAnimationComplete  }: {onAnimationComplete: AnimationCompleteHandler}) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      onAnimationComplete={onAnimationComplete}
      className="flex justify-center items-center h-full w-full"
    >
      <Image src={FlowLogo} alt="Flow Logo" priority={true} className="size-1/2"/>
    </motion.div>
  );
};

export default CentralLogo;
