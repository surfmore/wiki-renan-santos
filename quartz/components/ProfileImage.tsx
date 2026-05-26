import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export interface Options {
  src: string
  alt: string
  size?: number
}

const defaultOptions: Options = {
  src: "/static/renansantos.jpeg",
  alt: "Renan Santos",
  size: 100,
}

function ProfileImage({ displayClass }: QuartzComponentProps, opts?: Options) {
  const options = { ...defaultOptions, ...opts }
  const { src, alt, size } = options
  return (
    <div
      class={`profile-image ${displayClass ?? ""}`}
      style={`text-align:center;padding:0.8em 0 0.4em`}
    >
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={`border-radius:50%;object-fit:cover;display:inline-block`}
      />
    </div>
  )
}

ProfileImage.css = `
.profile-image {
  text-align: center;
  padding: 0.6em 0 0.2em;
}
.profile-image img {
  border-radius: 50%;
  object-fit: cover;
  display: inline-block;
  width: 100px;
  height: 100px;
}
`

export default ((opts?: Options) => (props: QuartzComponentProps) =>
  ProfileImage(props, opts)) satisfies QuartzComponentConstructor
