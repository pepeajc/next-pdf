import { useEffect } from 'react';

interface extraAttrItem {
	attribute: string;
	value: string;
}

interface Script {
	name: string;
	src: string;
	integrity?: string;
	crossOrigin?: string;
	referrerPolicy?: string;
	extraAttr?: extraAttrItem[];
}
interface useScriptProps {
	script: Script;
	appendHead: boolean;
	onLoad: () => void;
	onError: (error:any) => void;
}
interface ScriptCache {
	[key: string]: 'loading' | 'ready' | 'error';
}

const scriptCache: ScriptCache = {};

const loadScript = (script: Script, appendHead: boolean): Promise<void> => {
	return new Promise((resolve, reject) => {
		const scriptElement = document.querySelector(`script[src="${script.src}"]`);
		const isScriptLoading = scriptCache[script.name] === 'loading' || false;
		const isScriptReady = scriptCache[script.name] === 'ready' || false;

		if (isScriptReady) {
			resolve();
		} else if (isScriptLoading) {
			const resolveOnLoad = () => {
				resolve();
				scriptElement?.removeEventListener('load', resolveOnLoad);
			};
			scriptElement?.addEventListener('load', resolveOnLoad);
		} else {
			const el: HTMLScriptElement = document.createElement('script');
			el.src = script.src;
			el.type = 'text/javascript';
			if (script.integrity) el.integrity = script.integrity;
			if (script.crossOrigin) el.crossOrigin = script.crossOrigin;
			if (script.referrerPolicy) el.referrerPolicy = script.referrerPolicy;

			el.onload = () => {
				scriptCache[script.name] = 'ready';
				resolve();
			};
			el.onerror = () => {
				scriptCache[script.name] = 'error';
				reject();
			};

			script.extraAttr?.forEach((item) => el.setAttribute(item.attribute, item.value));

			if (appendHead) {
				el.async = true;
				document.head.appendChild(el);
			} else {
				document.body.appendChild(el);
			}

			scriptCache[script.name] = 'loading';
		}
	});
};

function useScript({ script, appendHead, onLoad, onError }: useScriptProps) {
	useEffect(() => {
		loadScript(script, appendHead)
			.then(() => onLoad())
			.catch((error) => onError(error));
	}, [script, appendHead, onLoad, onError]);
	return null;
}
export default useScript;
