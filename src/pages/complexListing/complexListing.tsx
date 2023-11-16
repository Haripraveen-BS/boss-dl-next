import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { SelectOptionType } from "@/constants/types";
import JSON from "../../constants/data.json";

const ComplexListing = () => {
    const navbarList = [
        {
            key: "User",
            value: "1100793",
        },
        {
            key: "Captions",
            value: "",
        },
        {
            key: "Caption History",
            value: "",
        },
        {
            key: "Caption Error",
            value: "",
        },
    ];
    const handleInputValue = (e: SelectOptionType) => {
        const { name, value } = e;
    };
    return (
        <div className="directListing mx-12">
            <div className=" p-5 bg-white mb-4 rounded-md">
                <section className="p-4 w-80 bg-yellow-200 bg-opacity-20">
                    <h2 className="font-bold text-2xl text-yellow-400">Captions</h2>
                    {navbarList.length > 0 && (
                        <nav className="p-3">
                            {navbarList.map((data, i) => (
                                <ol
                                    key={i}
                                    className="grid grid-flow-col gap-4 p-3 bg-white border-b"
                                >
                                    <span>{data.key}</span>
                                    {data.value && <span>: {data.value}</span>}
                                </ol>
                            ))}
                        </nav>
                    )}
                </section>
                <section className="p-4 w-80 bg-yellow-200 bg-opacity-20 rounded-md">
                    <h2 className="font-bold text-2xl text-yellow-400">Search</h2>
                    <nav className="p-3">
                        <Input
                            name="captionHeaderText"
                            inputValue={handleInputValue}
                            label="Caption Header Text"
                            className="w-full"
                            inputAction
                        />
                        <Select
                            name="options"
                            inputValue={handleInputValue}
                            label="Options"
                            inputAction={true}
                            options={JSON.selectOptions.complexOptions}
                        />
                    </nav>
                </section>
            </div>
            <div className="flex justify-between w-full">
            </div>
        </div>
    )
}

export default ComplexListing;