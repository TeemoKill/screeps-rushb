
import rollup_clear from 'rollup-plugin-clear';
import rollup_copy from 'rollup-plugin-copy';
import rollup_screeps from 'rollup-plugin-screeps';

let config

// obtain corresponding config according to target
if (!process.env.DEST) {
    console.log("no DEST specified, code will be compiled but not uploaded");
} else if (!(config = require("./.secret.json")[process.env.DEST])) {
    throw new Error("invalid target, please check .secret.json");
}

const pluginDeploy = config && config.copyPath ?
    rollup_copy(
        {
            targets: [
                {
                    src: 'dist/main.js',
                    dest: config.copyPath,
                },
                {
                    src: 'dist/main.js.map',
                    dest: config.copyPath,
                    rename: name => name + '.map.js',
                    transform: content => `module.exports = ${content.toString()};`,
                },
            ],
            hook: 'writeBundle',
            verbose: true,
        }
    ) :
    rollup_screeps({config, dryRun: !config});

export default {
    input: 'src/main.js',
    output: {
        dir: 'dist/',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        rollup_clear({targets: ['dist']}),
        pluginDeploy,
    ],
};
