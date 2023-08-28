import React, { Fragment, useEffect, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react";
import { SearchModel } from "@/types";

const SearchModel = (props: SearchModel) => {
    const [open, setOpen] = useState(props.open);
    const [value, setValue] = useState("");
  
    useEffect(() => {
      setOpen(props.open)
    }, [props.open]);
  
    const cancelButtonRef = useRef(null)
  
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.handleFilterModel}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white pb-2">
                    <div className="sm:flex sm:items-start">
                      <input
                        type="text"
                        name="search"
                        className=" model-search border-0 pl-9 text-gray-900  sm:text-sm  w-full"
                        placeholder="Type something"
                        onChange={(e) => {
                          setValue(e.target.value);
                        }}
                      />
                    </div>
                    <div className=''>
                      <label className='model-small-title'>Recommended</label>
                    </div>
                    <div className='model-data-body'>
                      {
                        props.data?.filter((row: any) => {
                          if (row.name.toLowerCase().includes(value.toLowerCase())) return true;
                          else return false;
                        }).map((row: any) => {
                          return (
                            <div key={`${row.id}-sr`} className='w-full data-label'>{row.name}</div>
                          );
                        })
                      }
                    </div>
                  </div>
  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  export default SearchModel