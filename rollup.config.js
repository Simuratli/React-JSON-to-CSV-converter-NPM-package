import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts  from 'rollup-plugin-dts';

const packageJson = require('./package.json');
export default [
    {
        input: 'src/App.tsx',
        output:[
            {
                file:packageJson.main,
                format:'cjs',
                sourcemap: true,
            },
            {
                file:packageJson.module,
                format:'esm',
                sourcemap: true,
            }
        ],
        plugins:[
            PeerDepsExternalPlugin(),
            resolve(),
            commonjs(),
            typescript({tsconfig: './tsconfig.json'}),
            terser(),
        ],
        external:['react','react-dom']
    },
    {
        input:"src/App.tsx",
        output:[
            {
                file:packageJson.types,
            }
        ],
        plugins:[
            dts.default(),
        ],
    }
]