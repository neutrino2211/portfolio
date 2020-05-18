/*
This function compiles templates and returns the result to be rendered.

Might have possibly over engineered this whole project 😅
*/


export function stateRenderer(state: any, source: string): string {
    const templates = /(@\{.*?\})/g;
    (source.match(templates) || []).forEach(t => {
        const varName = t.slice(2, -1)
        source = source.replace(t, state[varName])
    })
    return source;
}