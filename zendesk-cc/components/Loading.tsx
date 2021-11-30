import Image from "next/image";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// Loading page for better User experience when API calls are loading, to prevent premature loading of calls
export default function Loading() {
    return (
        <div className="w-screen h-screen flex-col flex items-center justify-center">
            <Image src="/LoadingLogo.svg" height="300" width="300" />
            <Spin
                size="large"
            />
        </div>
    );
}
