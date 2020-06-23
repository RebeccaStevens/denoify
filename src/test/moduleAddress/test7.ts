import { ModuleAddress } from "../../lib/ModuleAddress";

import * as inDepth from "evt/tools/inDepth";
import { assert } from "evt/tools/typeSafety";

(async () => {

    const moduleAddress: ModuleAddress.DenoLandUrl = {
        "type": "DENO.LAND URL",
        "isStd": false,
        "pathToIndex": "js-yaml.js",
        "baseUrlWithoutBranch": "https://deno.land/x/js_yaml_port",
        "branch": undefined
    };

    assert(
        inDepth.same(
            ModuleAddress.parse("https://deno.land/x/js_yaml_port/js-yaml.js"),
            moduleAddress
        )
    );

    {

        const getValidImportUrlFactoryResult = await ModuleAddress.getValidImportUrlFactory({
            moduleAddress,
            "desc": "MATCH VERSION INSTALLED IN NODE_MODULE",
            "version": "99.99.99"
        });

        assert(getValidImportUrlFactoryResult.couldConnect === true);

        assert(
            getValidImportUrlFactoryResult.isDenoified === false &&
            typeof getValidImportUrlFactoryResult.versionFallbackWarning === "string"
        );

        assert(
            await getValidImportUrlFactoryResult.getValidImportUrl({ "target": "DEFAULT EXPORT" })
            ===
            "https://deno.land/x/js_yaml_port@master/js-yaml.js"
        );

    }

    console.log("PASS");

})();