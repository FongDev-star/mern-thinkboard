import { ZapIcon } from "lucide-react";

const RateLimitUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-success/10 border border-success/30 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-4 p-6">
          <ZapIcon className="size-10 text-success shrink-0" />
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-xl mb-2">Rate Limit Reached</h3>
            <p className="text-base-content mb-1">
              You've made too many requests in a short period. Please wait a
              moment.
            </p>
            <p className="text-base-content/70 text-sm">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitUI;
