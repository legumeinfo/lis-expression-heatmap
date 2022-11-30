import { createRoot } from 'react-dom/client';
import RootContainer from './RootContainer';

// make sure to export main, with the signature
function main(el, service, imEntity, state, config) {
    if (!state) state = {};
    if (!el || !service || !imEntity || !state || !config) {
	throw new Error('Call main with correct signature');
    }
    const root = createRoot(el);
    root.render(
	<RootContainer
	    serviceUrl={service.root}
	    entity={imEntity.Gene}
	    config={config}
	/>
    );
}

export { main };
