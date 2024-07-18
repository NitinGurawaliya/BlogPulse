import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signup = () => {
  return <div>
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <div className="flex justify-center">
        <Auth type="signup" />
      </div>
      <div className="hidden md:block">
        <Quote />
      </div>
    </div>
  </div>
}
